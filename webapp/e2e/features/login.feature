Feature: Logging in as a user

Scenario: Logging in with valid credentials
  Given A user that is logged in the application
  When I enter valid username and password
  Then A confirmation message should be shown in the screen