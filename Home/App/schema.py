from graphene_django import DjangoObjectType
from .models import CustomUser,Expenses,SharedHome,SharedExpenses,Card
import graphene
from . import graphene_fields
from dateutil.relativedelta import relativedelta
from graphene import InputObjectType


class UserType(DjangoObjectType):
    class Meta:
        model = CustomUser
        
class HomeType(DjangoObjectType):
    class Meta:
        model = SharedHome        

class ExpenseType(DjangoObjectType):
    class Meta:
        model = Expenses
 
class CardType(DjangoObjectType):
    class Meta:
        model = Card       
        
class SharedExpensesType(DjangoObjectType):
    class Meta:
        model = SharedExpenses        

class PeriodUserExpense(graphene.ObjectType):
    period = graphene_fields.Period()
    expense = graphene.List(ExpenseType)
    
class PeriodUserCardExpense(graphene.ObjectType):
    period = graphene_fields.Period()
    card = graphene.List(CardType)
    
class Query(graphene.ObjectType):
    
    sharedHomes = graphene.List(HomeType)
    def resolve_sharedHomes(self, info, **kwargs):
        return SharedHome.objects.all()
    
    users = graphene.List(UserType)
    def resolve_users(self, info, **kwargs):
        return CustomUser.objects.all()
    
    all_cards = graphene.List(CardType)
    def resolve_all_cards(self,info,**kwargs):
        return Card.objects.all()
    
    current_user = graphene.Field(UserType)
    def resolve_current_user(self, info, **kwargs):
        return info.context.user
    
    expense_by_user = graphene.List(PeriodUserExpense,user=graphene.String(),date=graphene_fields.Period())
    def resolve_expense_by_user(self, info, **kwargs):
        periods = [kwargs["date"]-relativedelta(months=i) for i in range(6)]
        periodData = []
        for period in periods:
            periodData.append({
                "expense":Expenses.objects.filter(responsable__id=kwargs["user"] , date=period),
                "period":period
            })
        return periodData
    
    user = graphene.Field(UserType,id=graphene.String())
    def resolve_user(self, info, **kwargs):
        return CustomUser.objects.get(id=kwargs["id"])
        
    card_expense_by_user = graphene.List(PeriodUserCardExpense,user=graphene.String(),date=graphene_fields.Period())
    def resolve_card_expense_by_user(self, info, **kwargs):
        periods = [kwargs["date"]-relativedelta(months=i) for i in range(6)]
        periodData = []
        for period in periods:
            periodData.append({
                "card":Card.objects.filter(owner__id=kwargs["user"] , expense__date=period),
                "period":period
            })
        return periodData
    
    sharedExpenses = graphene.List(SharedExpensesType)    
    def resolve_sharedExpenses(self, info, **kwargs):
        return SharedExpenses.objects.all()
    
    expenses=graphene.List(ExpenseType)   
    def resolve_expenses(self, info, **kwargs):
        return Expenses.objects.all()


class ValidateUser(graphene.Mutation):
    user = graphene.Field(UserType)
    class Arguments:
        email = graphene.String()
        password = graphene.String()
        
    def mutate(self, info, **inputs):
        user = CustomUser.objects.get(email=inputs.get("email"))
        print(user.check_password(inputs.get("password")))
        return ValidateUser(user=user)

class CreateExpense(graphene.Mutation):
    expense = graphene.Field(ExpenseType)
    class Arguments:
        responsable = graphene.String()
        card_id = graphene.String()    
        card_amount = graphene.Float()
        date = graphene_fields.Period()
        cash = graphene.Float()
        name = graphene.String()
        
    def mutate(self, info, **inputs):
        user = CustomUser.objects.get(id=inputs.get("responsable"))
        expense = Expenses(date=inputs.get("date"),responsable=user,name=inputs.get("name"))
        
        card_amount = inputs.get("card_amount")
        if card_amount:
            expense.card_amount = card_amount
        cash = inputs.get("cash")    
        if cash:
            expense.cash = cash
                
        if inputs.get("card_id"):
            card = Card.objects.get(id=inputs.get("card_id"))
            expense.card = card
        
        expense.save()
            
        return CreateExpense(expense=expense)
    
class EditUser(graphene.Mutation):
    user = graphene.Field(UserType)
    class Arguments:
        user = graphene.String()
        first_name = graphene.String()
        last_name = graphene.String()    
        income = graphene.Float()
        savings =graphene.Float()
        email = graphene.String()
        password = graphene.String()
        
    def mutate(self, info, **inputs):
        user = CustomUser.objects.get(id=inputs.get("user"))
        
        if inputs.get("first_name"):
            user.first_name = inputs.get("first_name")        
        
        if inputs.get("last_name"):
            user.last_name = inputs.get("last_name")
        
        if inputs.get("income"):
            user.income = inputs.get("income")

        if inputs.get("email"):
            user.email = inputs.get("email")
    
        if inputs.get("savings"):
            user.savings = inputs.get("savings")      
        
        if inputs.get("password"):
            user.set_password(inputs.get("password"))  
            
        user.save()
            
        return EditUser(user=user)

        
class CreateCard(graphene.Mutation):
    card = graphene.Field(CardType)
    class Arguments:
        name = graphene.String()
        bank = graphene.String()
        user = graphene.String()
        
    def mutate(self, info, **inputs):
        user = CustomUser.objects.get(id=inputs.get("user"))
        card = Card(owner=user)
        
        if inputs.get("bank"):
            card.bank = inputs.get("bank")
        if inputs.get("name"):
            card.name = inputs.get("name")
        
        card.save()
        
        return CreateCard(card=card)        
    
    
class Mutation(graphene.ObjectType):
    validate_user = ValidateUser.Field()
    create_expense = CreateExpense.Field()
    edit_user = EditUser.Field()
    create_card = CreateCard.Field()
    
schema = graphene.Schema(query=Query ,mutation=Mutation)
    