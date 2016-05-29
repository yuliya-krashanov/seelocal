<?php

use SleepingOwl\Admin\Model\ModelConfiguration;

AdminSection::registerModel(Campaign_Plan::class, function (ModelConfiguration $model) {
    $model->setTitle('Campaign Plans');
// Display
    $model->onDisplay(function () {
        $display = AdminDisplay::table()->setColumns([
            AdminColumn::link('title')->setLabel('Title'),
            AdminColumn::string('price')->setLabel('Price'),
        ]);
        $display->paginate(15);
        return $display;
    });
// Create And Edit
    $model->onCreateAndEdit(function () {
        return $form = AdminForm::panel()->addBody(
            AdminFormElement::text('title', 'Title')->required(),
            AdminFormElement::text('price', 'Price')->required()
        );
        return $form;
    });
});