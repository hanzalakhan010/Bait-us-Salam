# Install required packages


# Generate ERD
from sqlalchemy_schemadisplay import create_schema_graph
from app import db  # Import your SQLAlchemy instance
from sqlalchemy import create_engine
import app

engine = create_engine(app.app.config['SQLALCHEMY_DATABASE_URI'])

graph = create_schema_graph(
    engine=engine,
    metadata=db.metadata,
    show_datatypes=False,
    show_indexes=True,
    rankdir='TB',
    concentrate=False
)
graph.write_png('erd.png')  # Save as image