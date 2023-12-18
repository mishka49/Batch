import sqlalchemy as db
from back.conf import DATABASE



engine = db.create_engine(
    "postgresql+psycopg2://{db_username}:{db_password}@{db_host}:{db_port}/{db_name}".format(
        db_username=DATABASE['USERNAME'],
        db_password=DATABASE['PASSWORD'],
        db_host=DATABASE['HOST'],
        db_port=DATABASE['PORT'],
        db_name=DATABASE['DB_NAME']
    ),
    echo=True
)

def connection(func):
    def wrapper(*args, **kwargs):
        with engine.connect() as conn:
            result = func(conn, *args, **kwargs)
            return result

    return wrapper
