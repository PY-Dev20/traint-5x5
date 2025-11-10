# backend/programs/admin.py
from django.contrib import admin
from .models import ProgramCategory, Program, ProgramSession, SessionExercise

class SessionExerciseInline(admin.TabularInline):
    model = SessionExercise
    extra = 5

class ProgramSessionInline(admin.StackedInline):
    model = ProgramSession
    extra = 1
    inlines = [SessionExerciseInline]



class ProgramAdmin(admin.ModelAdmin):
    list_display = ['get_name_en', 'category', 'difficulty', 'duration_weeks', 'coach', 'is_custom']
    list_filter = ['category', 'difficulty', 'is_custom', 'coach']
    inlines = [ProgramSessionInline]

    def get_name_en(self, obj):
        return obj.name.get('en', '—')
    get_name_en.short_description = 'Name (EN)'
    


@admin.register(ProgramCategory)
class ProgramCategoryAdmin(admin.ModelAdmin):
    list_display = ['get_name_en', 'get_name_ar', 'get_name_fr']

    def get_name_en(self, obj):
        return obj.name.get('en', '—')
    get_name_en.short_description = 'Name (EN)'

    def get_name_ar(self, obj):
        return obj.name.get('ar', '—')
    get_name_ar.short_description = 'Name (AR)'

    def get_name_fr(self, obj):
        return obj.name.get('fr', '—')
    get_name_fr.short_description = 'Name (FR)'