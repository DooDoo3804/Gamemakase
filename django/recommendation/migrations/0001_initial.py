# Generated by Django 3.2.13 on 2023-04-03 09:36

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='AuthGroup',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=150, unique=True)),
            ],
            options={
                'db_table': 'auth_group',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='AuthGroupPermissions',
            fields=[
                ('id', models.BigAutoField(primary_key=True, serialize=False)),
            ],
            options={
                'db_table': 'auth_group_permissions',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Authority',
            fields=[
                ('authority_name', models.CharField(max_length=10, primary_key=True, serialize=False)),
            ],
            options={
                'db_table': 'authority',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='AuthPermission',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('codename', models.CharField(max_length=100)),
            ],
            options={
                'db_table': 'auth_permission',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='AuthUser',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128)),
                ('last_login', models.DateTimeField(blank=True, null=True)),
                ('is_superuser', models.IntegerField()),
                ('username', models.CharField(max_length=150, unique=True)),
                ('first_name', models.CharField(max_length=150)),
                ('last_name', models.CharField(max_length=150)),
                ('email', models.CharField(max_length=254)),
                ('is_staff', models.IntegerField()),
                ('is_active', models.IntegerField()),
                ('date_joined', models.DateTimeField()),
            ],
            options={
                'db_table': 'auth_user',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='AuthUserGroups',
            fields=[
                ('id', models.BigAutoField(primary_key=True, serialize=False)),
            ],
            options={
                'db_table': 'auth_user_groups',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='AuthUserUserPermissions',
            fields=[
                ('id', models.BigAutoField(primary_key=True, serialize=False)),
            ],
            options={
                'db_table': 'auth_user_user_permissions',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='BackgroundTask',
            fields=[
                ('id', models.BigAutoField(primary_key=True, serialize=False)),
                ('task_name', models.CharField(max_length=190)),
                ('task_params', models.TextField()),
                ('task_hash', models.CharField(max_length=40)),
                ('verbose_name', models.CharField(blank=True, max_length=255, null=True)),
                ('priority', models.IntegerField()),
                ('run_at', models.DateTimeField()),
                ('repeat', models.BigIntegerField()),
                ('repeat_until', models.DateTimeField(blank=True, null=True)),
                ('queue', models.CharField(blank=True, max_length=190, null=True)),
                ('attempts', models.IntegerField()),
                ('failed_at', models.DateTimeField(blank=True, null=True)),
                ('last_error', models.TextField()),
                ('locked_by', models.CharField(blank=True, max_length=64, null=True)),
                ('locked_at', models.DateTimeField(blank=True, null=True)),
                ('creator_object_id', models.PositiveIntegerField(blank=True, null=True)),
            ],
            options={
                'db_table': 'background_task',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='BackgroundTaskCompletedtask',
            fields=[
                ('id', models.BigAutoField(primary_key=True, serialize=False)),
                ('task_name', models.CharField(max_length=190)),
                ('task_params', models.TextField()),
                ('task_hash', models.CharField(max_length=40)),
                ('verbose_name', models.CharField(blank=True, max_length=255, null=True)),
                ('priority', models.IntegerField()),
                ('run_at', models.DateTimeField()),
                ('repeat', models.BigIntegerField()),
                ('repeat_until', models.DateTimeField(blank=True, null=True)),
                ('queue', models.CharField(blank=True, max_length=190, null=True)),
                ('attempts', models.IntegerField()),
                ('failed_at', models.DateTimeField(blank=True, null=True)),
                ('last_error', models.TextField()),
                ('locked_by', models.CharField(blank=True, max_length=64, null=True)),
                ('locked_at', models.DateTimeField(blank=True, null=True)),
                ('creator_object_id', models.PositiveIntegerField(blank=True, null=True)),
            ],
            options={
                'db_table': 'background_task_completedtask',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Chat',
            fields=[
                ('chat_id', models.BigAutoField(primary_key=True, serialize=False)),
                ('content', models.CharField(max_length=200)),
                ('created_at', models.TimeField()),
            ],
            options={
                'db_table': 'chat',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='ChattingRoom',
            fields=[
                ('chatting_room_id', models.BigAutoField(primary_key=True, serialize=False)),
                ('chatting_room_name', models.CharField(max_length=40)),
                ('game_0', models.IntegerField(db_column='game')),
            ],
            options={
                'db_table': 'chatting_room',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='DailyRecommendation',
            fields=[
                ('daily_recommendation_id', models.BigAutoField(primary_key=True, serialize=False)),
                ('created_at', models.DateTimeField()),
            ],
            options={
                'db_table': 'daily_recommendation',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='DjangoAdminLog',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('action_time', models.DateTimeField()),
                ('object_id', models.TextField(blank=True, null=True)),
                ('object_repr', models.CharField(max_length=200)),
                ('action_flag', models.PositiveSmallIntegerField()),
                ('change_message', models.TextField()),
            ],
            options={
                'db_table': 'django_admin_log',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='DjangoApschedulerDjangojob',
            fields=[
                ('id', models.CharField(max_length=255, primary_key=True, serialize=False)),
                ('next_run_time', models.DateTimeField(blank=True, null=True)),
                ('job_state', models.TextField()),
            ],
            options={
                'db_table': 'django_apscheduler_djangojob',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='DjangoApschedulerDjangojobexecution',
            fields=[
                ('id', models.BigAutoField(primary_key=True, serialize=False)),
                ('status', models.CharField(max_length=50)),
                ('run_time', models.DateTimeField()),
                ('duration', models.DecimalField(blank=True, decimal_places=2, max_digits=15, null=True)),
                ('finished', models.DecimalField(blank=True, decimal_places=2, max_digits=15, null=True)),
                ('exception', models.CharField(blank=True, max_length=1000, null=True)),
                ('traceback', models.TextField(blank=True, null=True)),
            ],
            options={
                'db_table': 'django_apscheduler_djangojobexecution',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='DjangoContentType',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('app_label', models.CharField(max_length=100)),
                ('model', models.CharField(max_length=100)),
            ],
            options={
                'db_table': 'django_content_type',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='DjangoMigrations',
            fields=[
                ('id', models.BigAutoField(primary_key=True, serialize=False)),
                ('app', models.CharField(max_length=255)),
                ('name', models.CharField(max_length=255)),
                ('applied', models.DateTimeField()),
            ],
            options={
                'db_table': 'django_migrations',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='DjangoSession',
            fields=[
                ('session_key', models.CharField(max_length=40, primary_key=True, serialize=False)),
                ('session_data', models.TextField()),
                ('expire_date', models.DateTimeField()),
            ],
            options={
                'db_table': 'django_session',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Game',
            fields=[
                ('game_id', models.BigAutoField(primary_key=True, serialize=False)),
                ('game_name', models.CharField(max_length=200)),
                ('game_price', models.IntegerField()),
                ('release_date', models.DateTimeField()),
                ('game_description', models.TextField()),
                ('score', models.IntegerField()),
                ('average_playtime', models.IntegerField(blank=True, null=True)),
                ('publisher', models.CharField(blank=True, max_length=100, null=True)),
                ('is_korean', models.IntegerField(blank=True, null=True)),
                ('windows', models.IntegerField(blank=True, null=True)),
                ('mac', models.IntegerField(blank=True, null=True)),
                ('linux', models.IntegerField(blank=True, null=True)),
                ('peak_ccu', models.IntegerField(blank=True, null=True)),
                ('average_playtime_2weeks', models.IntegerField(blank=True, null=True)),
                ('recommendations', models.IntegerField(blank=True, null=True)),
                ('estimated_owners', models.CharField(blank=True, max_length=200, null=True)),
                ('reviews', models.IntegerField(blank=True, null=True)),
            ],
            options={
                'db_table': 'game',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='GameHistory',
            fields=[
                ('game_history_id', models.BigAutoField(primary_key=True, serialize=False)),
                ('total_play_game', models.IntegerField(blank=True, null=True)),
                ('two_week_play_time', models.IntegerField(blank=True, null=True)),
            ],
            options={
                'db_table': 'game_history',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='GameSmall',
            fields=[
                ('game_id', models.BigAutoField(primary_key=True, serialize=False)),
                ('game_name', models.CharField(max_length=200)),
                ('game_price', models.IntegerField()),
                ('release_date', models.DateTimeField()),
                ('game_description', models.TextField()),
                ('score', models.IntegerField()),
                ('average_playtime', models.IntegerField(blank=True, null=True)),
                ('publisher', models.CharField(blank=True, max_length=100, null=True)),
                ('is_korean', models.IntegerField(blank=True, null=True)),
                ('windows', models.IntegerField(blank=True, null=True)),
                ('mac', models.IntegerField(blank=True, null=True)),
                ('linux', models.IntegerField(blank=True, null=True)),
            ],
            options={
                'db_table': 'game_small',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='GameVideo',
            fields=[
                ('youtube_id', models.CharField(db_collation='utf8mb3_bin', max_length=255)),
                ('created_at', models.DateTimeField()),
                ('game_video_id', models.BigAutoField(primary_key=True, serialize=False)),
                ('youtube_name', models.TextField(db_collation='utf8mb3_bin')),
            ],
            options={
                'db_table': 'game_video',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Genre',
            fields=[
                ('genre_id', models.BigAutoField(primary_key=True, serialize=False)),
                ('genre_name', models.CharField(blank=True, max_length=100, null=True)),
            ],
            options={
                'db_table': 'genre',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Image',
            fields=[
                ('image_id', models.BigAutoField(primary_key=True, serialize=False)),
                ('type', models.CharField(max_length=20)),
                ('type_id', models.BigIntegerField()),
                ('image_path', models.CharField(max_length=200)),
            ],
            options={
                'db_table': 'image',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='LikeGame',
            fields=[
                ('like_id', models.BigAutoField(primary_key=True, serialize=False)),
                ('type', models.CharField(max_length=20)),
            ],
            options={
                'db_table': 'like_game',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Rating',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('game_id', models.BigIntegerField(blank=True, null=True)),
                ('steam_id', models.BigIntegerField(blank=True, null=True)),
                ('playtime', models.IntegerField(blank=True, null=True)),
                ('frequency', models.FloatField(blank=True, null=True)),
                ('rating', models.FloatField(blank=True, null=True)),
            ],
            options={
                'db_table': 'rating',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='RatingSmall',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('game_id', models.BigIntegerField(blank=True, null=True)),
                ('steam_id', models.IntegerField(blank=True, null=True)),
                ('playtime', models.IntegerField(blank=True, null=True)),
                ('frequency', models.FloatField(blank=True, null=True)),
                ('rating', models.FloatField(blank=True, null=True)),
            ],
            options={
                'db_table': 'rating_small',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Recommendation',
            fields=[
                ('rating', models.FloatField()),
                ('recommendation_id', models.BigAutoField(primary_key=True, serialize=False)),
            ],
            options={
                'db_table': 'recommendation',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Review',
            fields=[
                ('review_id', models.BigAutoField(primary_key=True, serialize=False)),
                ('review_title', models.CharField(max_length=20)),
                ('review_content', models.TextField()),
                ('review_grade', models.IntegerField()),
                ('created_at', models.DateTimeField(blank=True, null=True)),
                ('updated_at', models.DateTimeField(blank=True, null=True)),
            ],
            options={
                'db_table': 'review',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='TendencyResult',
            fields=[
                ('tendency_result_id', models.BigAutoField(primary_key=True, serialize=False)),
                ('tendency_result', models.CharField(max_length=20)),
                ('created_at', models.DateTimeField()),
            ],
            options={
                'db_table': 'tendency_result',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='TendencyTest',
            fields=[
                ('tendency_quest', models.CharField(max_length=100, primary_key=True, serialize=False)),
                ('tendency_comm', models.CharField(max_length=20)),
            ],
            options={
                'db_table': 'tendency_test',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('user_id', models.BigAutoField(primary_key=True, serialize=False)),
                ('user_steam_id', models.BigIntegerField()),
                ('user_name', models.CharField(max_length=40)),
            ],
            options={
                'db_table': 'user',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='UserAuthorityJoin',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
            options={
                'db_table': 'user_authority_join',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='UserOpenid',
            fields=[
                ('openid_url', models.CharField(max_length=100, primary_key=True, serialize=False)),
            ],
            options={
                'db_table': 'user_openid',
                'managed': False,
            },
        ),
    ]