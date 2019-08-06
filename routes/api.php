<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;
use Illuminate\Support\Collection;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/journal/teacher/{guid}/date/{date}', function (string $guid, string $date) {
    // $groups = collect(DB::select('select * from college.get_work_classes(?,?)', [$guid, $date]))
    //     -> map(function ($item) {
    //         $date_format = 'Y-m-d';
    //         return [
    //             'guid'=>$item->guid,
    //             'class_name'=>$item->class_name,
    //             'started_at'=>Carbon::parse($item->started_at)->format($date_format),
    //             'ended_in'=>Carbon::parse($item->ended_in)->format($date_format)];
    //     });
    $fake = [
        [
            "guid"=>"b4566065-9953-4a94-b8d5-e121355191e6",
            "class_name"=>"{0}01",
            "started_at"=>"2016-09-01",
            "ended_in"=>"2020-07-31"
        ],[
            "guid"=>"6fe37d70-0a14-41fa-9c4b-48dac1bf2f83",
            "class_name"=>"{0}22",
            "started_at"=>"2017-09-01",
            "ended_in"=>"2020-07-31"
        ],[
            "guid"=>"e50e3bbe-671c-4f31-bdcc-63a757c5028e",
            "class_name"=>"{0}02",
            "started_at"=>"2017-09-01",
            "ended_in"=>"2020-07-31"
        ],[
            "guid"=>"7123cd54-24e6-425a-9cb1-5f2ed50e67f9",
            "class_name"=>"{0}21",
            "started_at"=>"2017-09-01",
            "ended_in"=>"2020-07-31"
        ],[
            "guid"=>"29e112b2-3aa5-4ea9-ab4d-14994829778b",
            "class_name"=>"{0}21",
            "started_at"=>"2018-09-01",
            "ended_in"=>"2021-07-31"
        ]
    ];
    return $fake;
})->where(
    ['guid' => '^[0-9A-Fa-f]{8}(?:-[0-9A-Fa-f]{4}){3}-[0-9A-Fa-f]{12}$',
     'date' => '^[0-9]{4}(-[0-9]{2}){2}$']);
