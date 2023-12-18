from sqlalchemy import MetaData, Table, Column, ForeignKey
from sqlalchemy import Integer, Text, Numeric

meta_obj = MetaData()

compound_table = Table(
    "Compound",
    meta_obj,
    Column("id", Integer, primary_key=True),
    Column("Fe", Numeric(12, 10), default=0),
    Column("C", Numeric(12, 10), default=0),
    Column("Cr", Numeric(12, 10), default=0),
    Column("Mg", Numeric(12, 10), default=0),
    Column("Al", Numeric(12, 10), default=0),
    Column("Si", Numeric(12, 10), default=0),
    Column("Mn", Numeric(12, 10), default=0),
    Column("Cu", Numeric(12, 10), default=0),
    Column("Zn", Numeric(12, 10), default=0),
    Column("As", Numeric(12, 10), default=0),
    Column("Cd", Numeric(12, 10), default=0),
    Column("Sb", Numeric(12, 10), default=0),
    Column("Sn", Numeric(12, 10), default=0),
    Column("Pb", Numeric(12, 10), default=0),
    Column("Bi", Numeric(12, 10), default=0),
    Column("V", Numeric(12, 10), default=0),
    Column("Ni", Numeric(12, 10), default=0),
    Column("Co", Numeric(12, 10), default=0),
    Column("W", Numeric(12, 10), default=0),
    Column("Mo", Numeric(12, 10), default=0),
    Column("N", Numeric(12, 10), default=0),
    Column("Ti", Numeric(12, 10), default=0),
    Column("S", Numeric(12, 10), default=0),
    Column("P", Numeric(12, 10), default=0),
)

raw_material_table = Table(
    "RawMaterial",
    meta_obj,
    Column("id", Integer, primary_key=True),
    Column("brand", Text),
    Column("coast", Numeric(5, 2), default=0),
    Column("compound", ForeignKey("Compound.id"))
)

stoves_table = Table(
    "Stove",
    meta_obj,
    Column("id", Integer, primary_key=True),
    Column("type", Text),
    Column("waste_elem", ForeignKey("Compound.id"))
)

group_additives_table = Table(
    "AdditivesGroup",
    meta_obj,
    Column("id", Integer, primary_key=True),
    Column("leading_elem", Text),
)

additives_table = Table(
    "Additives",
    meta_obj,
    Column("id", Integer, primary_key=True),
    Column("group", ForeignKey("AdditivesGroup.id")),
    Column("brand", Text),
    Column("coast", Numeric(5, 2), default=0),
    Column("compound", ForeignKey("Compound.id")),
)
