<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Country extends Model
{
    protected $table = 'countries';

    protected $primaryKey = 'country_id';

    protected $fillable = ['country_name', 'country_code_char2', 'country_code_char3', 'un_region', 'un_subregion'];

}
