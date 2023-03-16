from django.apps import AppConfig
from django.conf import settings

# class MainAppConfig(AppConfig):
#     name = "mainapp"
#     def ready(self):
#         if settings.SCHEDULER_DEFAULT:
#             from jobs import updator
#             updator.start()

class RecommendationConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'recommendation'

    def ready(self):
        if settings.SCHEDULER_DEFAULT:
            from . import updator
            updator.start()
