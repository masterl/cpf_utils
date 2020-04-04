#!/bin/bash

readonly PROJECT_ROOT=$( cd "$( dirname "$0" )" && pwd )

readonly SCRIPT_PATH="$PROJECT_ROOT/entr_script.sh"

function main()
{
  while true; do
    find "$PROJECT_ROOT" -type f |
    grep -E "$PROJECT_ROOT/(lib|test)" |
    entr -d bash "$SCRIPT_PATH" "$PROJECT_ROOT" "$1"
  done
}

main "$@"
