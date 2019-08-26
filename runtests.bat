echo "Run Unit Tests - ytest"
pytest
echo "Run Integration Tests - Cypress"
npx cypress run
echo "API Testing - Postman tests need to be run manually"