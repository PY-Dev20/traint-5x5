from django.contrib import admin
from .models import Program, ProgramSession, SessionExercise

class SessionExerciseInline(admin.TabularInline):
    model = SessionExercise
    extra = 1

class ProgramSessionInline(admin.StackedInline):
    model = ProgramSession
    extra = 1
    inlines = [SessionExerciseInline]

@admin.register(Program)
class ProgramAdmin(admin.ModelAdmin):
    list_display = ['id', 'get_name_en', 'difficulty', 'coach', 'is_custom']
    list_filter = ['difficulty', 'is_custom', 'coach']
    inlines = [ProgramSessionInline]
    
    def get_name_en(self, obj):
        return obj.name.get('en', '-')
    get_name_en.short_description = 'Name (EN)'