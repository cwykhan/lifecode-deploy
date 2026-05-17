CC=gcc
CFLAGS=-O2 -Wall -Wextra
LDFLAGS=-lm
TARGET=saju-cli

$(TARGET): cal_calculation.c saju_cli.c cal20000_calculation_type.h cal20000_calculation_value.h cal_calculation.h
	$(CC) $(CFLAGS) -o $(TARGET) cal_calculation.c saju_cli.c $(LDFLAGS)

clean:
	rm -f $(TARGET)
