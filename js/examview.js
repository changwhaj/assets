    /* Hide & Show answers */
    $('body').on('click', '.btn.reveal-solution', function (e) {
        e.preventDefault();
        $(this).parent('.question-body').find('.question-answer').fadeIn(100);
        $(this).parent('.question-body').find('.hide-solution').removeClass('d-none');
        $(this).parent('.question-body').find('.correct-hidden').addClass('correct-choice');
        $(this).addClass('d-none');
    });

    $('body').on('click', '.btn.hide-solution', function (e) {
        e.preventDefault();
        $(this).parent('.question-body').find('.question-answer').fadeOut(100);
        $(this).parent('.question-body').find('.reveal-solution').removeClass('d-none');
        $(this).parent('.question-body').find('.correct-hidden').removeClass('correct-choice');
        $(this).addClass('d-none');
    });

    function is_question_mcq(question_jquery_object){
        return question_jquery_object.find(".multi-choice-letter").length > 0;
    }

    function set_voting_configuration_by_question(question_jquery_object) {
        // Voted comments are only for MCQ questions, this function has nothing to do on other questions
        if (!is_question_mcq(question_jquery_object))
            return;

        let choice_limit = question_jquery_object.find(".correct-answer").text().trim().length;
        let choices_elements = question_jquery_object.find(".multi-choice-letter");

        let choice_letters = "";
        choices_elements.each(function() {
            choice_letters += $(this).text().trim()[0];
        });

        let question_id = question_jquery_object.find(".question-body").addBack('.question-body').data("id");
        // let discussion_object = getDiscussionObjectByQuestionId(question_id);

        // set_voted_comment_config(discussion_object, choice_letters, choice_limit);
    }
