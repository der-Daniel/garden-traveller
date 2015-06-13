import os

DEBUG = True
SECRET_KEY = 'temporary_secret_key'  # make sure to change this
SQLALCHEMY_DATABASE_URI = 'sqlite:////tmp/cloudrecon.db'
BCRYPT_LOG_ROUNDS = 12

# email settings
MAIL_SENDER_ADDRESS = 'noreply@gccwebreconstruction.de'
SMTP_SERVER = 'smtp.igd.fraunhofer.de:587'

# uploads
UPLOAD_FOLDER = '/dmz-storage/cloudrecon/data'
ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg', 'JPG', 'JPEG'])
THUMBNAILS_WIDTH = 128
THUMBNAILS_HEIGHT = 128
DIRNAME_USER_IMAGES = 'images'

# datasets
DIR_DATASETS = '/dmz-storage/cloudrecon/data'
DS_DIR_HIDDEN = '.hidden'
MAX_DATASETS = 5
DIR_STANDARD_CONFIGS = os.path.join(DIR_DATASETS, 'standard_config_files')

# blacklist some chars/names when dealing with paths and filenames
# which the user can specify
BLACKLIST_CHARS = ['$', ';', '|', '>', '<', '*']
BLACKLIST_DIR = ['..', '~', DS_DIR_HIDDEN]

# helper scripts
JAIL_DELETE_SCRIPT = '/home/localadmin/repos/cloudrecon/tools/jail_delete.sh'
