"""Migration: initial_schema

Revision ID: 1789342362_initial_schema
Create Date: 2026-09-14 05:32:42
"""
from typing import Sequence, Union
from alembic import op
import sqlalchemy as sa

revision: str = '1789342362_initial_schema'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # Auto-generated Tiger Framework initial migration
    op.create_table(
        'items',
        sa.Column('id', sa.Integer(), nullable=False, primary_key=True),
        sa.Column('title', sa.String(length=255), nullable=False),
        sa.Column('description', sa.Text(), nullable=True),
        sa.Column('created_at', sa.DateTime(), server_default=sa.func.now(), nullable=False),
    )


def downgrade() -> None:
    op.drop_table('items')
