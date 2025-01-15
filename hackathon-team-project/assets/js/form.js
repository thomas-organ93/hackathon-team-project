$("form[id^='contactForm']").each(function () {
    var form = $(this);
    form.on("submit", function (event) {
        event.preventDefault();
        var formID = form.attr('id');

        if (!this.checkValidity()) {
            formError(form);
            submitMSG(form, false, "Did you fill in the form properly?");
            event.stopPropagation();
        } else {
            console.log("Submitting form: " + formID);
            submitForm(form, formID);
        }
        this.classList.add('was-validated');
    });
});

function submitForm(form, formID) {
    var name = form.find("#name").val();
    var email = form.find("#email").val();
    var mobile = form.find("#mobile").val();

    console.log("Form Data:", {
        name: name,
        email: email,
        mobile: mobile
    });

    $.ajax({
        type: "POST",
        url: "php/form-process.php",
        data: {
            name: name,
            email: email,
            mobile: mobile
        },
        success: function (response) {
            console.log("Server Response:", response);
            if (response.trim() === "success") {
                formSuccess(form);
            } else {
                formError(form);
                submitMSG(form, false, response);
            }
        },
        error: function (xhr, status, error) {
            console.error("AJAX Error:", status, error);
            formError(form);
            submitMSG(form, false, "An error occurred while processing the form.");
        }
    });
}

function formSuccess(form) {
    form[0].reset();
    form.removeClass('was-validated');  // Remove validation styling
    submitMSG(form, true, "Message Submitted!");

    setTimeout(function () {
        window.location.href = "../thankyou.php";
    }, 1000); // Delay of 1 second to display success message
}

function formError(form) {
    form.addClass('shake');  // Optionally add a shake animation class if available
}

function submitMSG(form, valid, msg) {
    var msgClasses = valid ? "h3 text-center text-success" : "h3 text-center text-danger";
    form.find("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
}




