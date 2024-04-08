Feature: Access the app

Scenario: A registered user enters the app
  Given A user that is logged in the application
  When I navigate to the Home page
  Then I should be able to interact with the app