from back.db_core.connection import connection
from back.db_core.tables import *

from sqlalchemy import delete


@connection
def delete(conn: connection, *args, **kwargs):
    pass

if __name__ == "__main__":
    delete(table=stoves_table, id=11)
