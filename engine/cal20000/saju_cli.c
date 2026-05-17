#include <stdio.h>
#include <stdlib.h>
#include "cal20000_calculation_type.h"
#include "cal_calculation.h"

static const char* stem_symbol(int idx) {
    static const char* stems[10] = {"T","t","F","f","E","e","M","m","W","w"};
    return stems[idx % 10];
}

static const char* branch_symbol(int idx) {
    static const char* branches[12] = {"w","e","T","t","E","F","f","e","M","m","E","W"};
    return branches[idx % 12];
}

static const char* element_of_stem_idx(int idx) {
    static const char* elements[10] = {"Tree","Tree","Fire","Fire","Earth","Earth","Metal","Metal","Water","Water"};
    return elements[idx % 10];
}

static const char* element_of_branch_idx(int idx) {
    static const char* elements[12] = {"Water","Earth","Tree","Tree","Earth","Fire","Fire","Earth","Metal","Metal","Earth","Water"};
    return elements[idx % 12];
}

static void print_pillar_json(const char* name, int ganji_index) {
    int stem_idx = ganji_index % 10;
    int branch_idx = ganji_index % 12;
    printf("\"%s\":{", name);
    printf("\"index\":%d,", ganji_index);
    printf("\"stem\":{\"index\":%d,\"symbol\":\"%s\",\"element\":\"%s\"},", stem_idx, stem_symbol(stem_idx), element_of_stem_idx(stem_idx));
    printf("\"branch\":{\"index\":%d,\"symbol\":\"%s\",\"element\":\"%s\"}", branch_idx, branch_symbol(branch_idx), element_of_branch_idx(branch_idx));
    printf("}");
}

int main(int argc, char** argv) {
    if (argc < 6) {
        fprintf(stderr, "Usage: %s YEAR MONTH DAY HOUR MIN\n", argv[0]);
        return 64;
    }

    int year = atoi(argv[1]);
    int month = atoi(argv[2]);
    int day = atoi(argv[3]);
    int hour = atoi(argv[4]);
    int min = atoi(argv[5]);

    if (month < 1 || month > 12 || day < 1 || day > 31 || hour < 0 || hour > 23 || min < 0 || min > 59) {
        fprintf(stderr, "Invalid date/time input\n");
        return 65;
    }

    so24_8letter r = sydtoso24yd(year, month, day, hour, min);

    printf("{");
    printf("\"input\":{\"year\":%d,\"month\":%d,\"day\":%d,\"hour\":%d,\"minute\":%d},", year, month, day, hour, min);
    printf("\"raw\":{\"so24\":%d,\"year\":%d,\"month\":%d,\"day\":%d,\"hour\":%d},", r.so24, r.so24year, r.so24month, r.so24day, r.so24hour);
    printf("\"pillars\":{");
    print_pillar_json("year", r.so24year);
    printf(",");
    print_pillar_json("month", r.so24month);
    printf(",");
    print_pillar_json("day", r.so24day);
    printf(",");
    print_pillar_json("hour", r.so24hour);
    printf("}");
    printf("}\n");

    return 0;
}
