/*
 * Created on Thu Sep 09 2021 10:38:51 AM
 *
 * Created by SR0C100568@techmahindra.com
 * Copyright (c) 2021 Tech Mahindra Limited
 */

const SpecReporter = require('jasmine-spec-reporter').SpecReporter;

jasmine.getEnv().clearReporters();               // remove default reporter logs
jasmine.getEnv().addReporter(new SpecReporter({  // add jasmine-spec-reporter
  spec: {
    displayPending: true,
    displayFailuresSummary: true,
    displayFailuredSpec: true,
    displaySuiteNumber: true,
    displaySpecDuration: true,
    displaySuccessful: true,
    displayErrorMessages: true
  }
}));