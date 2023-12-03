use regex::Regex;

fn main() {
    let file: &str = include_str!("../../input.txt");

    println!("Part 1: {}", get_sum(file));
}

fn get_sum(string: &str) -> i32 {
    let first_number_regex = Regex::new("^[a-z]*(?<num>[0-9])").unwrap();
    let last_number_regex = Regex::new("(?<num>[0-9])[a-z]*$").unwrap();

    let lines: Vec<&str> = string.trim().split("\n").collect::<Vec<&str>>();

    let mut sum = 0;

    for line in lines {
        let Some(first_num) = first_number_regex.captures(line.trim()) else {
            println!("Error finding first number in: {}", line);
            return 0;
        };
        let Some(last_num) = last_number_regex.captures(line.trim()) else {
            println!("Error finding last number in: {}", line);
            return 0;
        };

        let num: String = format!("{}{}", &first_num["num"], &last_num["num"]);

        sum += num.parse::<i32>().unwrap();
    }

    return sum;
}
