<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;
use Illuminate\Support\Collection;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;

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
    $input = [$guid, $date];
    $groups = collect(DB::select('select * from college.get_work_classes(?,?)', $input))
        ->map(function ($item) {
            $date_format = 'Y-m-d';
            return [
                'guid' => $item->guid,
                'class_name' => $item->class_name,
                'started_at' => Carbon::parse($item->started_at)->format($date_format),
                'ended_in' => Carbon::parse($item->ended_in)->format($date_format)
            ];
        });
    $lessons = collect(DB::select('select * from college.get_work_lessons(?,?)', $input));
    return ['classes' => $groups, 'lessons' => $lessons];
})->where(
    [
        'guid' => '^[0-9A-Fa-f]{8}(?:-[0-9A-Fa-f]{4}){3}-[0-9A-Fa-f]{12}$',
        'date' => '^[0-9]{4}(-[0-9]{2}){2}$'
    ]
);

Route::get('/journal/students/{groupGuid}/date/{date}', function (string $groupGuid, string $date) {
    $input = [$groupGuid, $date];
    $students = collect(DB::select(
        'select * from college.get_actual_students_by_class(?,?) order by (full_name).last_name', $input))
        ->map(function ($stud) {
            $date_format = 'Y-m-d';
            $full_name = splitFullName($stud->full_name);
            return [
                "guid" => $stud->guid,
                "full_name" => $full_name,
                "birth_at" => Carbon::parse($stud->birth_at)->format($date_format),
                "gender" => $stud->gender,
                "entred_at" => Carbon::parse($stud->entred_at)->format($date_format),
                "ended_in" => is_null($stud->ended_in)
                    ? null
                    : Carbon::parse($stud->ended_in)->format($date_format)
            ];
        });
    return ['students' => $students];
})->where(
    [
        'groupGuid' => '^[0-9A-Fa-f]{8}(?:-[0-9A-Fa-f]{4}){3}-[0-9A-Fa-f]{12}$',
        'date' => '^[0-9]{4}(-[0-9]{2}){2}$'
    ]
);

Route::get('/auth/passwordgen', function () {
    return Hash::make('secret');
});

Route::get('/auth/employees', function () {
    return collect(DB::select('select * from organization.get_users_by_type(\'e\')'));
});

Route::post('login', 'APILoginController@login');

Route::middleware('jwt.auth')->get('/test', function(Request $request) {
    $user = collect(
        DB::select('select per.name_last, per.name_first, per.name_second, usr.u_guid, usr.is_needed_password_replace from organization.persons as per left join organization.users as usr on per.p_guid = usr.u_guid where per.p_guid=?',
        [$request->user()->u_guid])
    );

    return $user;
});

function splitFullName($rawName) {
    return collect(explode(',', $rawName))
        ->map(function ($item) {
            return trim($item, '(")');
        })
        ->toArray();
}
