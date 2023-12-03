use regex::Regex;

fn main() {
    let file: &str = include_str!("../../input.txt");

    let numbers = vec![
        "zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine",
    ];

    let mut tmp = String::from(file);

    let mut num = 0;
    for num_string in numbers {
        tmp = tmp.replace(num_string, &format!("{}{}{}", num_string, num, num_string));

        num += 1;
    }

    print!("Part 2: {}", get_sum(&tmp));
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
