/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).toBeGreaterThan(0);
        });


        /* This is a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('URLs are defined', function() {
            for (let i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url.length).toBeGreaterThan(0);
            };
        });


        /* This is a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('names are defined', function() {
            for (let i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name.length).toBeGreaterThan(0);
            };
        });
    });


    /* This is a test suite to check menu visibility */
    describe('The menu', function() {
        /* Test to check if menu is hidden by default when the page loads */
        it('is hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

         /* This is a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
         it('is hidden when clicked', function() {
             // Click the menu icon then see if the body tag does not have class 'menu-hidden'
             $('.menu-icon-link').trigger('click');
             expect($('body').hasClass('menu-hidden')).not.toBe(true);
             // Click the menu icon again, then see if the body tag DOES have class 'menu-hidden'
             $('.menu-icon-link').trigger('click');
             expect($('body').hasClass('menu-hidden')).toBe(true);
             
         });
    });
    /* Testing "Initial Entries" */
    describe('Initial Entries', function() {

        /* This is a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

        //  Run loadFeed function before the test
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        // Make sure there are more than 0 ".entry" elements within the ".feed" element
        it('is not empty', function() {
            expect($('.feed').find('.entry').length).toBeGreaterThan(0);
        });
    });

    /* This is the "New Feed Selection" test suite for when a new feed is selected */
    describe('New Feed Selection', function() {

        /* This is a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */

        // Declare variables to be used later to store .feed html for two feeds

        let feedBefore = '';
        let feedAfter = '';

        beforeEach(function(done) {
            // run loadFeed twice and store .feed content in the respective variables
            loadFeed(0, function() {
                feedBefore = $('.feed').html();
            });
            loadFeed(1, function() {
                feedAfter = $('.feed').html();
                done();
            });
        });

        it('changed content in .feed', function() {
            // Compare contentBefore to contentAfter to determine if .feed was changed
            expect(feedBefore).not.toEqual(feedAfter);
        });

    });
}());
