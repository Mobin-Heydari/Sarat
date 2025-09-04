from pathlib import Path
import os

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-1yv-hb*g=&zxsp+@zg+=rk!spuqvff_3x&f2vf$flfxe8^i3z8'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []


# Application definition

INSTALLED_APPS = [
    # The Jazzmin admin third party package.
    'jazzmin',

    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    # Third party libs
    'rest_framework',
    'corsheaders',
    'ckeditor',
    'ckeditor_uploader',

    # custom apps
    'Contacts.apps.ContactsConfig',
    'Cliparts.apps.ClipartsConfig',
    'Stories.apps.StoriesConfig',
    'Audios.apps.AudiosConfig',
    'Funny.apps.FunnyConfig',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',

    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
]

ROOT_URLCONF = 'Server.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'Server.wsgi.application'


# Database
# https://docs.djangoproject.com/en/5.2/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}


# Password validation
# https://docs.djangoproject.com/en/5.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/5.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.2/howto/static-files/

STATIC_URL = 'static/'
MEDIA_URL = 'media/'
STATICFILES_DIRS = [os.path.join(BASE_DIR, 'static')]
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')


# Default primary key field type
# https://docs.djangoproject.com/en/5.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'



# Jazzmin configuration
JAZZMIN_SETTINGS = {
    # Site title appearing in the window/tab title
    "site_title": "Sarat | مدیریت",
    
    # Header text shown above the Django admin’s logo
    "site_header": "Sarat",
    
    # Brand name for the side menu – often the same as the site header
    "site_brand": "Sarat",
    
    # Welcome text on the login screen
    "welcome_sign": "خوش آمدید به Sarat",
    
    # Copyright string (usually includes the current year)
    "copyright": "© 2025 Sarat",
    
    # Whether to show the UI builder link in the admin header
    "show_ui_builder": True,
    
    # Controls how the change form lays out the fields. Options include "vertical", "horizontal_tabs" or "collapsible"
    "changeform_format": "horizontal_tabs",
    
    # The language code for the admin interface – "fa" for Persian
    "language_code": "fa",
    
    # Whether to load Google Fonts from a CDN. Set to False if you prefer local fonts
    "use_google_fonts_cdn": False,
    
    # Enable RTL (right-to-left) support for Persian
    "rtl": True,
    
    # Optional: You can also specify a theme URL to use your own custom CSS
    "theme_url": None,
    
    # Icon classes mapping (optional customization)
    "icons": {
        "auth": "fas fa-users",
        "Sites": "fas fa-globe",
        "Invoices": "fas fa-file-invoice-dollar",
        "Users": "fas fa-user",
    },
}

# Optional: UI tweaks allow you to fine-tune the appearance of various parts of Jazzmin
JAZZMIN_UI_TWEAKS = {
    "navbar_small_text": False,
    "footer_small_text": False,
    "body_small_text": False,
    "brand_colour": "#3a89cd",  # Blue shade for the brand area
    "accent_colour": "#d2d6de",  # Default accent colour
    "navbar_colour": "navbar-dark bg-primary",  # Navbar styling – dark navbar with primary background
    "no_padding": False,
    "sidebar_nav_small_text": True,
    "sidebar_disable_expand": False,
    "sidebar_nav_child_indent": True,
    "sidebar_nav_compact_style": True,
    "sidebar_nav_animation_speed": 300,  # Speed of sidebar animations (in ms)
    "sidebar_nav_icon_style": "fa fa-fw",  # Icon style for the sidebar
}


CORS_ALLOWED_ORIGINS = [
    'http://localhost:3000',
]

CORS_ALLOW_ALL_ORIGINS = True


# Ckeditor settings
CKEDITOR_UPLOAD_PATH = "uploads/"
CKEDITOR_CONFIGS = {
    'default': {
        'toolbar': 'full',
        'height': 300,
        'width': '100%',
    },
}
