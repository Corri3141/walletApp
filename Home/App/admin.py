from django.contrib import admin
from .models import Expenses,CustomUser,SharedHome,SharedExpenses,Card

admin.site.site_header = "Wallet Stadistics";
admin.site.site_title = "Wallet Stadistics";
# Register your models here.
class UserAdmin(admin.ModelAdmin):
    list_display = ['email', 'first_name', 'last_name']
    list_filter = ('first_name', 'last_name')

admin.site.register(CustomUser,UserAdmin)
admin.site.register(Card)
admin.site.register(Expenses)
admin.site.register(SharedHome)
admin.site.register(SharedExpenses)


# Register your models here.
