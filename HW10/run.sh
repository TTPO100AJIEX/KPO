cd src
javac **/*.java -d ../vm
cd ../
java -Xmx16g -classpath vm multithreading/Test