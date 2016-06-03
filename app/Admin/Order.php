<?php

use SleepingOwl\Admin\Model\ModelConfiguration;

AdminSection::registerModel(\App\Order::class, function (ModelConfiguration $model) {
    $model->setTitle('Campaign Plans');
// Display
    $model->onDisplay(function () {
        $display = AdminDisplay::table()->setColumns([
            AdminColumn::text('transection_id')->setLabel('Transaction ID'),
            AdminColumn::text('price')->setLabel('Amount'),
        ]);
        $display->paginate(15);
        return $display;
    });
// Create And Edit
    $model->onCreateAndEdit(function () {
        return $form = AdminForm::panel()->addBody(
          //  AdminFormElement::text('title', 'Title')->required(),
          //  AdminFormElement::textAddon('price_0', 'Price')->setAddon('£')->required()
        );
    });
});
