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
        'read': function() {
            let ajax_options = {
                type: 'GET',
                url: 'api/message',
                accepts: 'application/json',
                dataType: 'json'
            };
            $.ajax(ajax_options)
            .done(function(data) {
                $event_pump.trigger('model_read_success', [data]);
            })
            .fail(function(xhr, textStatus, errorThrown) {
                $event_pump.trigger('model_error', [xhr, textStatus, errorThrown]);
            })
        },     
        'read_by_user': function(findname) {
            let ajax_options = {
                type: 'GET',
                url: `api/message/${findname}`,
                accepts: 'application/json',
                dataType: 'json'
            };
            $.ajax(ajax_options)
            .done(function(data) {
                $event_pump.trigger('user_model_read_success', [data]);
            })
            .fail(function(xhr, textStatus, errorThrown) {
                $event_pump.trigger('model_error', [xhr, textStatus, errorThrown]);
            })
        },          
        create: function(post) {
            let ajax_options = {
                type: 'POST',
                url: 'api/message',
                accepts: 'application/json',
                contentType: 'application/json',
                dataType: 'json',
                data: JSON.stringify(post)
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

    // return the API
    return {
        reset: function() {
            $message_id.val('');
            $name.val('');
            $post.val('').focus();
            $name_reply.val('');
            $post_reply.val('').focus();            
        },        
        build_table: function(message) {            
            let rows = ''

            // clear the table
            $('.message table > tbody').empty();

            // did we get a message array?
            if (message) {
                // Sort messages so that replies follow the root message
                var root_message = [];
                var reply_message = [];
                var sorted_message = [];
                var j = 0;
                var k = 0;
                for (let i=0, l=message.length; i < l; i++) {
                    if (message[i].parent_id == 0) {
                        root_message[j]=message[i];
                        j++;
                    } else {
                        reply_message[k]=message[i];
                        k++;
                    }
                }
                var index = 0;
                for (let i=0, l=root_message.length; i < l; i++) {
                    sorted_message[index] = root_message[i];
                    index++;
                    for (let j=0, l=reply_message.length; j < l; j++) {   
                        if (reply_message[j].parent_id == root_message[i].message_id) {
                            sorted_message[index] = reply_message[j];
                            index++;
                        }
                    }
                }
                var messageType = "rootMessage";
                for (let i=0, l=sorted_message.length; i < l; i++) {
                    if (sorted_message[i].parent_id != 0) messageType = "replyMessage";
                    else  messageType = "rootMessage"
                    rows += `<tr data-message-id="${sorted_message[i].message_id}" class=${messageType}>
                        <td class="name">${sorted_message[i].name}</td>
                        <td class="text_entry">${sorted_message[i].text_entry}</td>
                        <td>${sorted_message[i].timestamp}</td>
                        <td class=${messageType+"_btn"}><button onclick="openForm(${sorted_message[i].message_id})">Reply</button></td>
                    </tr>`;
                }
                $(rows).appendTo($("#all_messages_table"));
            }
        },
        build_table_by_user: function(message) {            
            let rows = ''

            // clear the table
            $('.message_by_user table > tbody').empty();

            // did we get a message array?
            if (message) {
                for (let i=0, l=message.length; i < l; i++) {
                    rows += `<tr data-message-id="${message[i].message_id}">
                        <td class="name">${message[i].name}</td>
                        <td class="text_entry">${message[i].text_entry}</td>
                        <td>${message[i].timestamp}</td>
                    </tr>`;
                }
                //$('table > tbody').append(rows);
                $(rows).appendTo($("#user_messages_table"));
            }
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
        $message_id = $('#message_id'),
        $parent_id = $('#parent_id'),
        $name = $('#name'),
        $name_reply = $('#name_reply'),
        $findname = $('#findname'),
        $post = $('#post'),
        $post_reply = $('#post_reply');


    // Get the data from the model after the controller is done initializing
    setTimeout(function() {
        model.read();
    }, 100)        

    // Validate input
    function validate(name, message_text) {
        return name !== "" && message_text !== "";
    }
    function validate(name) {
        return name !== "";
    }
       
    // Create our event handlers
    $('#create').click(function(e) {
        let username = $name.val();
        let message_text = $post.val();
        let parent_id = parseInt($parent_id.val());

        e.preventDefault();

        if (validate(username, message_text)) {
            model.create({
                'name': username,
                'parent_id': parent_id,
                'text_entry': message_text,
            })
        } else {
            alert('Problem with message post input');
        }        
    });

    // Create our event handlers
    $('#create_reply').click(function(e) {
        let username = $name_reply.val();
        let message_text = $post_reply.val();
        let parent_id = parseInt($parent_id.val());

        e.preventDefault();

        if (validate(username, message_text)) {
            model.create({
                'name': username,
                'parent_id': parent_id,
                'text_entry': message_text,
            })
        } else {
            alert('Problem with message post input');
        }        
    });    

    $('#find').click(function(e) {
        let findname = $findname.val();

        e.preventDefault();

        if (validate(findname)) {
            model.read_by_user(findname);
        } else {
            alert('Problem with user find input');
        }        
    });    

    // Handle the model events
    $event_pump.on('model_read_success', function(e, data) {
        view.build_table(data);
        view.reset();
    });
    $event_pump.on('user_model_read_success', function(e, data) {
        view.build_table_by_user(data);
        view.reset();
    });
    $event_pump.on('model_create_success', function(e, data) {
        model.read();
        view.reset();
    });

    $event_pump.on('model_error', function(e, xhr, textStatus, errorThrown) {
        let error_msg = textStatus + ': ' + errorThrown + ' - ' + xhr.responseJSON.detail;
        view.error(error_msg);``
        console.log(error_msg);
    })
}(ns.model, ns.view));

function openForm(id) {
    document.getElementById('name_reply').value = "";
    document.getElementById('post_reply').value = "";
    document.getElementById('parent_id').value = id;
    document.getElementById("reply").style.display = "block";
}
  
function closeForm() {
    document.getElementById("reply").style.display = "none";
}
