from sqlalchemy import select, Table
from back.db_core.tables import raw_material_table, stoves_table, group_additives_table, additives_table, compound_table

from back.db_core.connection import connection


@connection
def get_list_elements(conn: connection):
    return [str(column.name) for column in compound_table.columns][1:]


@connection
def __get_all(conn: connection, table: Table):
    head = tuple([str(column.name) for column in table.columns][1:])
    statements = select(table)

    items = conn.execute(statements)

    return [dict(zip(head, tuple(item))) for item in items]


@connection
def get_raw_materials(conn: connection):
    statements = select(raw_material_table)
    return conn.execute(statements)

@connection
def get_raw_material(conn: connection, brand):
    statement = select(raw_material_table).where(raw_material_table.c.brand == brand)
    return conn.execute(statement)



@connection
def get_stoves(conn: connection):
    statements = select(stoves_table)
    result = conn.execute(statements)

    return result


@connection
def get_stove(conn: connection, stove_type: stoves_table.c.type):
    statements = select(stoves_table).where(stoves_table.c.type == stove_type)
    return conn.execute(statements)




# @connection
# def get_additives(conn: connection, group: group_additives_table.c.id):
#     statements = select(additives_table).where(additives_table.c.group == group)
#     return conn.execute(statements)

@connection
def get_additives(conn: connection):
    statements = select(additives_table)
    return conn.execute(statements)


@connection
def get_additive(conn: connection, brand):
    statement = select(additives_table).where(additives_table.c.brand == brand)
    return conn.execute(statement)


@connection
def get_additives_groups(conn: connection):
    statements = select(group_additives_table)
    return conn.execute(statements)


@connection
def get_compound(conn: connection, id_compound: compound_table.c.id):
    statements = select(compound_table).where(compound_table.c.id == id_compound)
    return conn.execute(statements)


if __name__ == "__main__":
    result = get_raw_material('Сталь 45')
    print(result)

    for row in result:
        print(f"ROW: {row}")
