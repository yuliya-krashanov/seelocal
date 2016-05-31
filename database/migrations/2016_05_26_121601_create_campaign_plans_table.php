<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCampaignPlansTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('campaign_plans', function (Blueprint $table) {
            $table->increments('id');
            $table->string('title');
            $table->decimal('price_0');
            $table->decimal('price_1');
            $table->decimal('price_2');
            $table->integer('display_ads_shown_0');
            $table->integer('display_ads_shown_1');
            $table->integer('display_ads_shown_2');
            $table->boolean('fully_optimized_display_ads');
            $table->boolean('conversion_optimised_landing');
            $table->boolean('brand_awareness');
            $table->boolean('lead_generation');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('campaign_plans');
    }
}
