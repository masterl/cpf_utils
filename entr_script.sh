#!/bin/bash

readonly SCRIPT_NAME="$0"

readonly PROJECT_ROOT="$1"

readonly TEST_FILE="$2"

function main()
{
  tput reset

  ensure_project_root_was_informed "$1"

  run_tests

  echo
  print_line

  run_git_status_if_available

  echo
  date
}

function run_tests()
{
  echo "Running tests..."
  print_line

  echo "[$TEST_FILE]"

  if [ -z "$TEST_FILE" ]; then
    npm test
  else
    "$PROJECT_ROOT/node_modules/.bin/_mocha" "$TEST_FILE" && npm run lint
  fi
}

function run_git_status_if_available()
{
  if [ -x "$(command -v git)" ]
  then
    echo "Running GIT Status..."
    print_line
    git -C "$PROJECT_ROOT" status -sb
  fi
}

function ensure_project_root_was_informed()
{
  if [ -z "$1" ]
  then
    echo -e "\n\tERROR\n"
    echo -e "Missing project root path!\n"
    print_usage
    exit 1
  fi
}

function print_usage()
{
  echo -e "\nUsage:"
  echo "    $SCRIPT_NAME path/to/project/root [test_file]"
}

function print_line()
{
  echo "=================================================="
}

main "$@"
