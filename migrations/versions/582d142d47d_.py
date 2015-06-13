"""empty message

Revision ID: 582d142d47d
Revises: None
Create Date: 2015-06-13 15:33:27.839106

"""

# revision identifiers, used by Alembic.
revision = '582d142d47d'
down_revision = None

from alembic import op
import sqlalchemy as sa


def upgrade():
    ### commands auto generated by Alembic - please adjust! ###
    op.create_table('location',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('longitude', sa.String(length=128), nullable=False),
    sa.Column('latitude', sa.String(length=128), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('product',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=256), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('name')
    )
    op.create_table('user',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('surname', sa.String(length=128), nullable=False),
    sa.Column('name', sa.String(length=128), nullable=False),
    sa.Column('email', sa.String(length=128), nullable=False),
    sa.Column('_password', sa.String(length=128), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    op.create_table('address',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('street', sa.String(length=128), nullable=False),
    sa.Column('zipcode', sa.String(length=128), nullable=False),
    sa.Column('house_number', sa.String(length=128), nullable=False),
    sa.Column('city', sa.String(length=128), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('garden',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('address', sa.Integer(), nullable=False),
    sa.Column('location', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['address'], ['address.id'], ),
    sa.ForeignKeyConstraint(['location'], ['location.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('offering',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('amount', sa.Integer(), nullable=False),
    sa.Column('price', sa.String(length=128), nullable=False),
    sa.Column('date', sa.DateTime(), nullable=True),
    sa.Column('garden_id', sa.Integer(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('product_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['garden_id'], ['garden.id'], ),
    sa.ForeignKeyConstraint(['product_id'], ['product.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    ### end Alembic commands ###


def downgrade():
    ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('offering')
    op.drop_table('garden')
    op.drop_table('address')
    op.drop_table('user')
    op.drop_table('product')
    op.drop_table('location')
    ### end Alembic commands ###
