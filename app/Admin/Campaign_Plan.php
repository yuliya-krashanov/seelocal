<?php

use SleepingOwl\Admin\Model\ModelConfiguration;

AdminSection::registerModel(App\Campaign_Plan::class, function (ModelConfiguration $model) {
    $model->setTitle('Campaign Plans');
// Display
    $model->onDisplay(function () {
        $display = AdminDisplay::table()->setColumns([
            AdminColumn::link('title')->setLabel('Title'),
            AdminColumn::text('price_0')->setLabel('Price (2 Weeks)'),
            AdminColumn::text('price_1')->setLabel('Price (1 Month)'),
            AdminColumn::text('price_2')->setLabel('Price (3 Months)'),
        ]);
        $display->paginate(15);
        return $display;
    });
// Create And Edit
    $model->onCreateAndEdit(function () {
        return $form = AdminForm::panel()->addBody(
            AdminFormElement::text('title', 'Title')->required(),
            AdminFormElement::textAddon('price_0', 'Price')->setPlacement('£')->required()
        );
    });
});