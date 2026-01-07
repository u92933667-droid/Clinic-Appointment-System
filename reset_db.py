"""
Database Reset Script
This script directly deletes all data from the database and triggers a fresh reload.
"""

import os
import sqlite3

def reset_database():
    db_path = "clinic.db"
    
    print("Starting database reset...")
    print()
    
    # Check if database exists
    if not os.path.exists(db_path):
        print("No database found - it will be created with new data on next startup")
        return
    
    print(f"Found database: {db_path}")
    
    try:
        # Connect and delete all tables
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        
        # Get all table names
        cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
        tables = cursor.fetchall()
        
        print(f"Deleting {len(tables)} tables...")
        
        # Drop all tables
        for table in tables:
            table_name = table[0]
            cursor.execute(f"DROP TABLE IF EXISTS {table_name}")
            print(f"  Deleted table: {table_name}")
        
        conn.commit()
        conn.close()
        
        print()
        print("SUCCESS! Database cleared!")
        print()
        print("Next steps:")
        print("  1. The backend server should auto-reload now")
        print("  2. Look for: 'Database populated with 10 patients, 8 doctors, and 10 appointments!'")
        print("  3. Refresh your browser")
        print()
        
    except Exception as e:
        print(f"Error: {e}")
        print()
        print("Alternative: Delete the file manually")
        print(f"Run: Remove-Item '{db_path}' -Force")
        
if __name__ == "__main__":
    reset_database()
