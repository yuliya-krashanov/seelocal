<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class State extends Model
{
    protected $table = 'states_subdivisions';

    protected $fillable = ['state_subdivision_name', 'state_subdivision_alternate_names', 'primary_level_name', 'state_subdivision_code'];
}
