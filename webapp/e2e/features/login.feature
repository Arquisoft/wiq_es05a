Feature: Logging in as a user

Scenario: Logging in with valid credentials
  Given An existing user
  When I enter valid username and password
  Then A confirmation message should be shown in the screen