#!/bin/bash

readonly current_directory=`pwd`

readonly current_user=$(whoami)
readonly real_user=`who -m | awk '{print $1;}'`

ulimit_size=`ulimit -Sn`

if [ $ulimit_size -lt 4000 ]; then
  ulimit -Sn 5000
fi

echo -e "#!/bin/sh\n\nnpm --prefix ./server test\nexit \$?" > $current_directory/../.git/hooks/pre-push
chmod 760 $current_directory/../.git/hooks/pre-push

ignore_list=()
ignore_list+=('/.git')
ignore_list+=('/coverage')
ignore_list+=('/apidoc')
ignore_list+=('/docs')
ignore_list+=('/etc')
ignore_list+=('/.eslintignore')
ignore_list+=('/.eslintrc.json')
ignore_list+=('/node_modules')
ignore_list+=('/package.json')
ignore_list+=('/autotest.sh')
ignore_list+=('/.gitignore')

prefixed_ignore_list=()

prefix_ignore_array()
{
  for element in ${ignore_list[@]}
  do
    prefixed_ignore_list+=("$current_directory$element")
  done
}

prefix_ignore_array

grep_ignore_list=''
for element in ${prefixed_ignore_list[@]}
do
  grep_ignore_list="$grep_ignore_list grep -v \"$element\" |"
done

test_command=''

if [ $# -eq 0 ]; then
  test_command="npm test"
else
  test_command="./node_modules/.bin/_mocha $@ && npm run lint"
fi

readonly git_status_command="git status"

readonly print_line="echo \\\"==================================================\\\""

entr_command="entr -d sh -c \""
entr_command="$entr_command tput reset;"
entr_command="$entr_command echo \\\"Running tests...\\\";"
entr_command="$entr_command $print_line;"
entr_command="$entr_command $test_command;"
entr_command="$entr_command echo; $print_line;"
entr_command="$entr_command echo \\\"Current directory:\t$current_directory\\\";"
entr_command="$entr_command echo; $print_line;"
entr_command="$entr_command echo \\\"Running GIT Status...\\\";"
entr_command="$entr_command $print_line;"
entr_command="$entr_command $git_status_command;"
entr_command="$entr_command echo;"
entr_command="$entr_command date;"
entr_command="$entr_command\""

command_str="find $current_directory | $grep_ignore_list"
command_str="$command_str $entr_command"

# echo $command_str
# exit

while true; do
  eval $command_str
done
