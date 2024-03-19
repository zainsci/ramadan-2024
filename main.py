#! /bin/python3

"""
Write a recursive python function that prints the triangle:

    *
   **
  ***
 ****
*****

From Python Kampala WhatsApp Group
"""


def print_stars(width, num):
    if num == 0:
        print(width * "*")
        return

    print(num * " " + (width - num) * "*")
    print_stars(width, num-1)


def two_liner():
    i = int(input("Enter Num: "))
    print("\n".join([(i-x)*" "+(x+1)*"*" for x in range(i)]))


def main():
    width = int(input("Enter width: "))
    print_stars(width, width-1)

    two_liner()


if __name__ == "__main__":
    main()
