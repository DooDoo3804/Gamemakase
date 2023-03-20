from apscheduler.schedulers.background import BackgroundScheduler
from .views import schedule_api
from django_apscheduler.jobstores import register_events, DjangoJobStore

def start():
    print("start schedule")
    scheduler = BackgroundScheduler()
    scheduler.add_job(schedule_api, 'interval', minutes = 5)
    register_events(scheduler)
    @scheduler.scheduled_job('cron', minute = '0', second = '0', name = 'auto_update')
    def auto_update():
        schedule_api()
    scheduler.start()
    print("started")