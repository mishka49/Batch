from sqlalchemy import insert
from back.db_core.tables import *
from back.db_core.connection import connection


@connection
def create_compound(conn: connection, **kwargs):
    statement = insert(compound_table).values(**kwargs)

    result = conn.execute(statement).inserted_primary_key[0]
    conn.commit()

    return result


@connection
def create_stove(conn: connection, type: str):
    statements = insert(stoves_table).values(
        type=type,
        waste_elem=create_compound()
    )

    conn.execute(statements)
    conn.commit()


@connection
def create_raw_material(conn: connection, brand: str):
    statement = insert(raw_material_table).values(
        brand=brand,
        compound=create_compound()
    )

    conn.execute(statement)
    conn.commit()


if __name__ == "__main__":
    create_raw_material("Сталь 45")
