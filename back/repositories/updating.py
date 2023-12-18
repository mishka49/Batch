from sqlalchemy import update

from back.db_core.connection import connection
from back.db_core.tables import *


@connection
def update_compound(conn: connection, id: compound_table.c.id,**kwargs):
    statement = update(compound_table).where(compound_table.c.id == id).values(**kwargs)

    conn.execute(statement)
    conn.commit()


if __name__ == "__main__":
    print(update_compound(id=21, Si=0.005))
