# node js excel file write and read test for cephfs
## build
```
./build_image.sh
./push_image.sh
```
## env
```
PORT=8080
DATA_LOC=./
READ_SVC=http://localhost:8080
```
## test
```
write only /write/filename/repeat
http://localhost:8080/write/124/1

read only /read/filename
http://localhost:8080/read/124

write then read /write/filename/repeat/read
http://localhost:8080/write/124/100/read

```
