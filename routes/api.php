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
    // $fake = [
    //     "classes" => [
    //         [
    //             "guid" => "b4566065-9953-4a94-b8d5-e121355191e6",
    //             "class_name" => "{0}01",
    //             "started_at" => "2016-09-01",
    //             "ended_in" => "2020-07-31"
    //         ],
    //         [
    //             "guid" => "6fe37d70-0a14-41fa-9c4b-48dac1bf2f83",
    //             "class_name" => "{1}22", "started_at" => "2017-09-01",
    //             "ended_in" => "2020-07-31"
    //         ],
    //         [
    //             "guid" => "e50e3bbe-671c-4f31-bdcc-63a757c5028e",
    //             "class_name" => "{1}02",
    //             "started_at" => "2017-09-01",
    //             "ended_in" => "2020-07-31"
    //         ],
    //         [
    //             "guid" => "7123cd54-24e6-425a-9cb1-5f2ed50e67f9",
    //             "class_name" => "{1}21",
    //             "started_at" => "2017-09-01",
    //             "ended_in" => "2020-07-31"
    //         ],
    //         [
    //             "guid" => "29e112b2-3aa5-4ea9-ab4d-14994829778b",
    //             "class_name" => "{1}21",
    //             "started_at" => "2018-09-01",
    //             "ended_in" => "2021-07-31"
    //         ]
    //     ],
    //     "lessons" => [
    //         [
    //             "guid" => "8bc4aa23-4945-4f06-ad0e-79c830f73a02",
    //             "lesson_name" => "Баскетбол"
    //         ],
    //         [
    //             "guid" => "001c03b9-f99a-48bf-b874-0e8201e491ae",
    //             "lesson_name" => "Лыжный спорт"
    //         ],
    //         [
    //             "guid" => "8fb35af8-47fd-4988-9a1d-c9de1cb964f9",
    //             "lesson_name" => "Методика обучения предмету «Физическая культура»"
    //         ]
    //     ]
    // ];
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
            $full_name = collect(explode(',', $stud->full_name))
                ->map(function ($item) {
                    return trim($item, '(")');
                })
                ->toArray();
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
    // $fake = [
    //     [
    //         "guid" => "784a6c6e-36b0-4ab3-8caf-d7ab75b865a1",
    //         "full_name" => "(Байгаринов,Ильяс,Каирбаевич)",
    //         "birth_at" => "1999-06-26 00:00:00",
    //         "gender" => "male",
    //         "entred_at" => "2017-09-01 00:00:00",
    //         "ended_in" => null
    //     ],
    //     [
    //         "guid" => "1fa21716-49c1-4a90-8f51-c044e117b423",
    //         "full_name" => "(Бибик,Екатерина,Евгеньевна)",
    //         "birth_at" => "1999-03-06 00:00:00",
    //         "gender" => "female",
    //         "entred_at" => "2017-09-01 00:00:00",
    //         "ended_in" => null
    //     ],
    //     [
    //         "guid" => "30ffac93-58ac-4d95-9663-81aa1fa9ef05",
    //         "full_name" => "(Волоченский,Артём,Николаевич)",
    //         "birth_at" => "2000-02-14 00:00:00",
    //         "gender" => "male",
    //         "entred_at" => "2017-09-01 00:00:00",
    //         "ended_in" => null
    //     ],
    //     [
    //         "guid" => "074dcfd6-6176-482e-a679-9ce66e71c43b",
    //         "full_name" => "(Граф,Евгений,Сергеевич)",
    //         "birth_at" => "2000-05-04 00:00:00",
    //         "gender" => "male",
    //         "entred_at" => "2017-09-01 00:00:00",
    //         "ended_in" => null
    //     ],
    //     [
    //         "guid" => "65c22072-bddc-47be-9669-2fa347000d40",
    //         "full_name" => "(Кошелев,Сергей,Анатольевич)",
    //         "birth_at" => "1999-03-26 00:00:00",
    //         "gender" => "male",
    //         "entred_at" => "2017-09-01 00:00:00",
    //         "ended_in" => null
    //     ],
    //     [
    //         "guid" => "42575ae6-57b9-4a6c-b484-65bd8158b9a2",
    //         "full_name" => "(Лиждовой,Пётр,Владимирович)",
    //         "birth_at" => "1999-09-18 00:00:00",
    //         "gender" => "male",
    //         "entred_at" => "2017-09-01 00:00:00",
    //         "ended_in" => null
    //     ],
    //     [
    //         "guid" => "a6241359-494a-424a-81f1-7ca42ec00476",
    //         "full_name" => "(Михайлюк,Дмитрий,Сергеевич)",
    //         "birth_at" => "1999-03-06 00:00:00",
    //         "gender" => "male",
    //         "entred_at" => "2017-09-01 00:00:00",
    //         "ended_in" => null
    //     ],
    //     [
    //         "guid" => "d4bc8e3a-baf4-4256-84ff-d136f6e45532",
    //         "full_name" => "(Очередько,Сергей,Андреевич)",
    //         "birth_at" => "1999-03-18 00:00:00",
    //         "gender" => "male",
    //         "entred_at" => "2017-09-01 00:00:00",
    //         "ended_in" => null
    //     ],
    //     [
    //         "guid" => "a96c8402-c0a2-4624-8382-cdf7813f3f60",
    //         "full_name" => "(\"Раковский\",Олег,Олегович)",
    //         "birth_at" => "2000-02-12 00:00:00",
    //         "gender" => "male",
    //         "entred_at" => "2017-09-01 00:00:00",
    //         "ended_in" => null
    //     ],
    //     [
    //         "guid" => "78f18b12-e96c-473c-b6b8-d6fae23a6cfc",
    //         "full_name" => "(\"Рахимова\",Яна,\"Ринатовна\")",
    //         "birth_at" => "1998-11-04 00:00:00",
    //         "gender" => "female",
    //         "entred_at" => "2017-09-01 00:00:00",
    //         "ended_in" => null
    //     ],
    //     [
    //         "guid" => "ce1caf31-d2bf-4d84-95a6-bb6ec3e78f20",
    //         "full_name" => "(Степаненко,\"Роман\",Владимирович)",
    //         "birth_at" => "1999-12-15 00:00:00",
    //         "gender" => "male",
    //         "entred_at" => "2017-09-01 00:00:00",
    //         "ended_in" => null
    //     ],
    //     [
    //         "guid" => "dd2b5745-b274-4a0f-a059-8d352459b462",
    //         "full_name" => "(Тыраганова,Дарья,Александровна)",
    //         "birth_at" => "1999-11-10 00:00:00",
    //         "gender" => "female",
    //         "entred_at" => "2017-09-01 00:00:00",
    //         "ended_in" => null
    //     ],
    //     [
    //         "guid" => "ee7af183-48d2-47cd-ae1d-3d6705191aab",
    //         "full_name" => "(Хаунов,Иван,Анатольевич)",
    //         "birth_at" => "1997-11-08 00:00:00",
    //         "gender" => "male",
    //         "entred_at" => "2017-09-01 00:00:00",
    //         "ended_in" => null
    //     ],
    //     [
    //         "guid" => "bfbf3bb2-ca2f-4d42-bff9-44b8d44ede7c",
    //         "full_name" => "(Череменецкий,Максим,Евгеньевич)",
    //         "birth_at" => "1999-04-25 00:00:00",
    //         "gender" => "male",
    //         "entred_at" => "2017-09-01 00:00:00",
    //         "ended_in" => null
    //     ],
    //     [
    //         "guid" => "7ccb1e7e-1855-455f-bc2c-e892a650e125",
    //         "full_name" => "(Шаповалов,Павел,Владимирович)",
    //         "birth_at" => "1998-04-20 00:00:00",
    //         "gender" => "male",
    //         "entred_at" => "2017-09-01 00:00:00",
    //         "ended_in" => null
    //     ],
    //     [
    //         "guid" => "4b0d9937-1458-410f-8449-cd574bd9dd13",
    //         "full_name" => "(Штукерт,Валентина,Владимировна)",
    //         "birth_at" => "1996-11-11 00:00:00",
    //         "gender" => "female",
    //         "entred_at" => "2017-09-01 00:00:00",
    //         "ended_in" => null
    //     ],

    // ];
    // $fake = collect($fake)->map(function ($stud) {
    //     $date_format = 'Y-m-d';
    //     $full_name = collect(explode(',', $stud['full_name']))
    //         ->map(function ($item) {
    //             return trim($item, '(")');
    //         })
    //         ->toArray();
    //     return [
    //         "guid" => $stud['guid'],
    //         "full_name" => $full_name,
    //         "birth_at" => Carbon::parse($stud['birth_at'])->format($date_format),
    //         "gender" => $stud['gender'],
    //         "entred_at" => Carbon::parse($stud['entred_at'])->format($date_format),
    //         "ended_in" => is_null($stud['ended_in']) ? null : Carbon::parse($stud['ended_in'])->format($date_format)
    //     ];
    // });
    return ['students' => $students];
})->where(
    [
        'groupGuid' => '^[0-9A-Fa-f]{8}(?:-[0-9A-Fa-f]{4}){3}-[0-9A-Fa-f]{12}$',
        'date' => '^[0-9]{4}(-[0-9]{2}){2}$'
    ]
);
