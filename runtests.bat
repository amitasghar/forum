REM "Run Unit Tests - pytest"
REM pytest - removed as we are using ORM and cypress does a better job
echo "Run Integration Tests - Cypress"
echo "Switch to test DB"
cp message.db message_bak.db
cp test_db.db message.db
start call run.bat
sleep 10
npx cypress run
echo "Restore DB"
cp message_bak.db message.db
echo "API Testing - Postman tests need to be run manually"