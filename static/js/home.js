/*
 * JavaScript file for the forum application
 */

// Create the namespace instance
let ns = {};

// Create the model instance
ns.model = (function() {
    'use strict';

    let $event_pump = $('body');

    // Return the API
    return {
        done: function(word) {
            let ajax_options = {
                type: 'GET',
                url: 'api/echo/' + word,
                accepts: 'application/json',
                contentType: 'application/json',
                dataType: 'json',
                data: JSON.stringify({
                    'word': word
                })
            };
            $.ajax(ajax_options)
            .done(function(data) {
                $event_pump.trigger('model_create_success', [data]);
            })
            .fail(function(xhr, textStatus, errorThrown) {
                $event_pump.trigger('model_error', [xhr, textStatus, errorThrown]);
            })
        }
    };
}());

// Create the view instance
ns.view = (function() {
    'use strict';

    let $word = $('#word');

    // return the API
    return {
        reset: function() {
            $word.val('');
            $word.val('').focus();
        },
        update_editor: function(word) {
            $word.val(word).focus();
        },
        build_table: function(word) {            
            let rows = ''

            // clear the table
            $('.people table > tbody').empty();

            rows = `<tr><td class="word" id="firstword">${word.msg}</td></tr>`;
            $('table > tbody').append(rows);
        },
        error: function(error_msg) {
            $('.error')
                .text(error_msg)
                .css('visibility', 'visible');
            setTimeout(function() {
                $('.error').css('visibility', 'hidden');
            }, 3000)
        }
    };
}());

// Create the controller
ns.controller = (function(m, v) {
    'use strict';

    let model = m,
        view = v,
        $event_pump = $('body'),
        $word = $('#word');

    // Validate input
    function validate(word) {
        return word !== "";
    }

    // Create our event handlers
    $('#done').click(function(e) {
        let word = $word.val();

        e.preventDefault();

        if (validate(word)) {
            model.done(word)
        } else {
            alert('Problem with word input');
        }
    });

    $('#reset').click(function() {
        view.reset();
    })

    $('table > tbody').on('dblclick', 'tr', function(e) {
        let $target = $(e.target),
            fname,
            lname;

        fname = $target
            .parent()
            .find('td.fname')
            .text();

        lname = $target
            .parent()
            .find('td.lname')
            .text();

        view.update_editor(fname, lname);
    });

    // Handle the model events
    $event_pump.on('model_create_success', function(e, data) {
        view.build_table(data);
        view.reset();
    });

    $event_pump.on('model_error', function(e, xhr, textStatus, errorThrown) {
        let error_msg = textStatus + ': ' + errorThrown + ' - ' + xhr.responseJSON.detail;
        view.error(error_msg);
        console.log(error_msg);
    })
}(ns.model, ns.view));
