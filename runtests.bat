REM "Run Unit Tests - pytest"
REM pytest - removed as we are using ORM and cypress does a better job
echo "Run Integration Tests - Cypress"
npx cypress run
echo "API Testing - Postman tests need to be run manually"