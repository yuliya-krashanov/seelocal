<?php

use SleepingOwl\Admin\Model\ModelConfiguration;

AdminSection::registerModel(App\User::class, function (ModelConfiguration $model) {
    $model->setTitle('Campaign Plans');
// Display
    $model->onDisplay(function () {
        $display = AdminDisplay::table()->setColumns([
            AdminColumn::text('first_name')->setLabel('First Name'),
            AdminColumn::text('last_name')->setLabel('Last Name'),
            AdminColumn::text('email')->setLabel('Email'),
            AdminColumn::text('company_name')->setLabel('Company'),
            AdminColumn::text('phone_number')->setLabel('Phone Number'),
        ]);
        $display->paginate(15);
        return $display;
    });
// Create And Edit
    $model->onCreateAndEdit(function () {
        return $form = AdminForm::panel()->addBody(
            AdminFormElement::text('first_name', 'First name')->required(),
            AdminFormElement::text('last_name', 'Last name')->required(),
            AdminFormElement::text('last_name', 'Last name')->required(),
            AdminFormElement::text('company_name', 'Company')->required(),
            AdminFormElement::text('phone_number', 'Phone Number')->required(),

        );
    });
});

