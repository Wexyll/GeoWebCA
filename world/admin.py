from django.contrib.gis import admin
from django.contrib.auth import get_user_model
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .forms import UserAdminCreationForm, UserAdminChangeForm
from .models import *


admin.site.register(WorldBorder, admin.OSMGeoAdmin)


User = get_user_model()


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    # The forms to add and change user instances
    form = UserAdminChangeForm
    add_form = UserAdminCreationForm
    list_editable = ['admin', 'staff']

    # The fields to be used in displaying the User model.
    # These override the definitions on the base UserAdmin
    # that reference specific fields on auth.User.
    list_display = ['email', 'first_name', 'last_name', 'admin', 'staff', 'last_satId',]
    list_filter = ['admin', 'staff']
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal Information', {'fields': ('first_name', 'last_name',)}),
        ('Permissions', {'fields': ('admin', 'staff')}),
        ('Location', {'fields': ('last_location',)}),
        ('Satellite', {'fields': ('last_satId', 'last_satLocation')}),
    )
    # add_fieldsets is not a standard ModelAdmin attribute. UserAdmin
    # overrides get_fieldsets to use this attribute when creating a user.
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password', 'password_2')}
         ),
    )
    search_fields = ['email', 'first_name', 'last_name', 'last_satId']
    ordering = ['email']
    filter_horizontal = ()