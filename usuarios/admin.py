from django.contrib import admin
from usuarios.models import Profile

class ProfileFeatures(admin.ModelAdmin):
    list_display = ("user","about", "picture")
    list_display_links = ("about","user")
    search_fields = ("about","user")
    list_filter = ("about","user")
    list_per_page = 10
admin.site.register(Profile, ProfileFeatures)