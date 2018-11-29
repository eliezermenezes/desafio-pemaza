<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Client extends Model
{
    use SoftDeletes;

    protected $database = 'client';
    protected $fillable = [
        'code', 'name', 'register'
    ];
    protected $dates = ['deleted_at'];
}
